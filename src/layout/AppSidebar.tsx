/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
 
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
 
  PieChartIcon,
  PlugInIcon,
 
  UserCircleIcon,
  GroupIcon,
  LockIcon,
  
  TaskIcon,
  BoltIcon,
  MailIcon,
  DollarLineIcon,
  DocsIcon,
  ShootingStarIcon,
  
  InfoIcon,
  
  FileIcon,
 
} from "../icons";
import { useSidebar } from "../context/SidebarContext";


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// Core Section
const coreItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
    
  },
];

// Access Section
const accessItems: NavItem[] = [
  {
    icon: <GroupIcon />,
    name: "Users & Access",
    subItems: [
      { name: "All Users", path: "/users", pro: false },
      { name: "Invite / Register", path: "/users/invite", pro: false },
      { name: "Roles & Permissions", path: "/users/roles", pro: false },
      { name: "Sessions & Devices", path: "/users/sessions", pro: false },
    ],
  },
   {
    icon:<BoxCubeIcon />,
    name: "Organizations",
    path: "/organizations",
    
    
  },
 
];

// CRM Section
const crmItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Leads & CRM",
    subItems: [
      { name: "All Leads", path: "/crm/leads", pro: false },
    
      { name: "Pipeline Board", path: "/crm/pipeline", pro: false },
      { name: "Import / Export", path: "/crm/import-export", pro: false },
    ],
  },
  {
    icon: <ListIcon />,
    name: "Forms & Embeds",
    subItems: [
      { name: "Form Builder", path: "/forms/builder", pro: false },
      { name: "Embed Scripts", path: "/forms/embeds", pro: false },
      { name: "Responses", path: "/forms/responses", pro: false },
      { name: "Pipelines & Stages", path: "/forms/pipelines", pro: false },
    ],
  },
];

// Automation Section
const automationItems: NavItem[] = [
  {
    icon: <BoltIcon />,
    name: "Workflows & Automation",
    subItems: [
      { name: "Workflows", path: "/automation/workflows", pro: false },
      { name: "Workflow Builder", path: "/automation/builder", pro: false },
      { name: "Workflow Runs / Logs", path: "/automation/logs", pro: false },
    ],
  },
  {
    icon: <TaskIcon />,
    name: "Actions & Tasks",
    subItems: [
      { name: "Action Templates", path: "/automation/templates", pro: false },
      { name: "Assignment Rules", path: "/automation/rules", pro: false },
    ],
  },
];

// Marketing Section
const marketingItems: NavItem[] = [
  {
    icon: <ShootingStarIcon />,
    name: "Campaigns & Ads",
    subItems: [
      { name: "UTM Tracking", path: "/marketing/utm", pro: false },
      { name: "Campaign Performance", path: "/marketing/performance", pro: false },
    ],
  },
];

// Communications Section
const communicationsItems: NavItem[] = [
  {
    icon: <MailIcon />,
    name: "Communications",
    subItems: [
      { name: "Email Templates", path: "/communications/email", pro: false },
      { name: "SMS Templates", path: "/communications/sms", pro: false },
      { name: "WhatsApp Templates", path: "/communications/whatsapp", pro: false },
      { name: "Notifications", path: "/communications/notifications", pro: false },
    ],
  },
];

// Finance Section
const financeItems: NavItem[] = [
  {
    icon: <DollarLineIcon />,
    name: "Finance",
    subItems: [
      { name: "Payments & Orders", path: "/finance/payments", pro: false },
      { name: "Subscriptions & Plans", path: "/finance/subscriptions", pro: false },
    ],
  },
];

// Integrations Section
const integrationsItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "Integrations",
    subItems: [
      { name: "API Keys", path: "/integrations/api-keys", pro: false },
      { name: "Webhooks & Endpoints", path: "/integrations/webhooks", pro: false },
    ],
  },
];

// Insights Section
const insightsItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Analytics & Reports",
    subItems: [
      { name: "Reports", path: "/insights/reports", pro: false },
      { name: "Activity Feed", path: "/insights/activity", pro: false },
    ],
  },
];

// Content Section
const contentItems: NavItem[] = [
  {
    icon: <DocsIcon />,
    name: "Templates & Content",
    subItems: [
      { name: "Documents", path: "/content/documents", pro: false },
      { name: "Snippet Manager", path: "/content/snippets", pro: false },
    ],
  },
];

// Developer Section
const developerItems: NavItem[] = [
  {
    icon: <FileIcon />,
    name: "Developer / APIs",
    subItems: [
      { name: "API Docs", path: "/developer/docs", pro: false },
      { name: "SDKs", path: "/developer/sdks", pro: false },
      { name: "Test Console", path: "/developer/console", pro: false },
      { name: "Webhook Tester", path: "/developer/webhook-tester", pro: false },
    ],
  },
];

// Security Section
const securityItems: NavItem[] = [
  {
    icon: <LockIcon />,
    name: "Security",
    subItems: [
      { name: "Audit & Logs", path: "/security/audit", pro: false },
      { name: "Security Events", path: "/security/events", pro: false },
    ],
  },
];

// System Section
const systemItems: NavItem[] = [
  {
    icon: <BoxCubeIcon />,
    name: "System",
    subItems: [
      { name: "System Settings", path: "/system/settings", pro: false },
      { name: "Feature Flags", path: "/system/features", pro: false },
    ],
  },
];

// Support Section
const supportItems: NavItem[] = [
  {
    icon: <InfoIcon />,
    name: "Help & Support",
    subItems: [
      { name: "Tickets", path: "/support/tickets", pro: false },
      { name: "Knowledge Base", path: "/support/kb", pro: false },
      { name: "Contact Center", path: "/support/contact", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: string;
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    const allSections = [
      { items: coreItems, type: "core" },
      { items: accessItems, type: "access" },
      { items: crmItems, type: "crm" },
      { items: automationItems, type: "automation" },
      { items: marketingItems, type: "marketing" },
      { items: communicationsItems, type: "communications" },
      { items: financeItems, type: "finance" },
      { items: integrationsItems, type: "integrations" },
      { items: insightsItems, type: "insights" },
      { items: contentItems, type: "content" },
      { items: developerItems, type: "developer" },
      { items: securityItems, type: "security" },
      { items: systemItems, type: "system" },
      { items: supportItems, type: "support" },
    ];

    allSections.forEach(({ items, type }) => {
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: type as any,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: string) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: string) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <h2>XOLOX</h2>
            </>
          ) : (
            <h2>XOLOX</h2>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Core Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Core"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(coreItems, "core")}
            </div>

            {/* Access Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Access"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(accessItems, "access")}
            </div>

            {/* CRM Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "CRM"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(crmItems, "crm")}
            </div>

            {/* Automation Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Automation"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(automationItems, "automation")}
            </div>

            {/* Marketing Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Marketing"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(marketingItems, "marketing")}
            </div>

            {/* Communications Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Communications"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(communicationsItems, "communications")}
            </div>

            {/* Finance Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Finance"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(financeItems, "finance")}
            </div>

            {/* Integrations Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Integrations"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(integrationsItems, "integrations")}
            </div>

            {/* Insights Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Insights"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(insightsItems, "insights")}
            </div>

            {/* Content Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Content"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(contentItems, "content")}
            </div>

            {/* Developer Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Developer"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(developerItems, "developer")}
            </div>

            {/* Security Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Security"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(securityItems, "security")}
            </div>

            {/* System Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "System"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(systemItems, "system")}
            </div>

            {/* Support Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Support"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div>
          </div>
        </nav>
      
      </div>
    </aside>
  );
};

export default AppSidebar;
