export type UserSidebarMenuItem = {
  title: string;
  href?: string;
  isActive?: boolean;
  isImplemented?: boolean;
  children?: UserSidebarMenuItem[];
};

export type UserSidebarProps = {
  /**
   * Menu items to display
   */
  items: UserSidebarMenuItem[];
  /**
   * Callback when a menu item is clicked (for navigation)
   * @param href - The href of the clicked item
   */
  onNavigate: (href: string) => void;
  /**
   * Callback when an unimplemented feature is clicked
   * @param title - The title of the clicked item
   */
  onUnimplementedClick: (title: string) => void;
};
