import ChatList from "@/components/common/message/ChatList";

export const RightSide() {
  return (
    <>
        <div
          id="hs-sidebar-empty-content"
          className="hs-overlay  [--auto-close:lg] border lg:block lg:translate-x-0 lg:start-auto lg:bottom-0  
hs-overlay-open:translate-x-0
translate-x-full transition-all duration-300 transform 
rounded-lg
  
bg-white border-s border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
          role="dialog"
          aria-label="Sidebar"
        >
          <ChatList />
        </div>
    </>
  );
}
