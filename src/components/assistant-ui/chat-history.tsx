"use client";

import { useState, useEffect } from "react";
import { ArchiveIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, MessageCircleIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { trpc } from "@/trpc/react";
import { useAgentSettingsStore } from "@/store/agent-settings";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 10;

export const ChatHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { project } = useAgentSettingsStore();

  const utils = trpc.useUtils();

  const { data, isLoading, isError } = trpc.conversation.listConversations.useQuery({
    projectId: project || undefined,
    limit: ITEMS_PER_PAGE,
    offset: currentPage * ITEMS_PER_PAGE,
  });

  const deleteConversationMutation = trpc.conversation.deleteConversation.useMutation({
    onSuccess: () => {
      // Refetch conversations after deletion
      utils.conversation.listConversations.invalidate();
    },
  });

  // Reset pagination when project changes
  useEffect(() => {
    setCurrentPage(0);
  }, [project]);

  const handleDeleteConversation = async (conversationId: string) => {
    if (confirm("Are you sure you want to delete this conversation?")) {
      await deleteConversationMutation.mutateAsync({ id: conversationId });
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    if (data?.hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateTitle = (title: string, maxLength: number = 40) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

  if (isError) {
    return (
      <div className="my-12">
        <p className="text-xs text-muted-foreground mb-4">Chat History</p>
        <div className="text-center py-8">
          <p className="text-sm text-red-500">Error loading chat history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">Chat History</p>
        {data?.totalCount && (
          <Badge variant="secondary" className="text-xs">
            {data.totalCount} total
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-4 w-4 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : !data?.conversations?.length ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No conversations yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Start a new conversation to see it here
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {data.conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <MessageCircleIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {truncateTitle(conversation.title)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(new Date(conversation.createdAt))}
                      </p>
                      {conversation.projectName && (
                        <Badge variant="outline" className="text-xs">
                          {conversation.projectName}
                        </Badge>
                      )}
                      {conversation.bookmarked && (
                        <ArchiveIcon className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipIconButton
                    tooltip="Delete conversation"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conversation.id);
                    }}
                    disabled={deleteConversationMutation.isPending}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </TooltipIconButton>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {data.totalCount > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  Page {currentPage + 1} of {Math.ceil(data.totalCount / ITEMS_PER_PAGE)}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!data.hasMore}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};