import { useState } from "react";
import MemoryTab from "./tabs/MemoryTab";
import ProjectsTab from "./tabs/ProjectsTab";
import TransferTab from "./tabs/TransferTab";
import SettingsTab from "./tabs/SettingsTab";
import {
  IconCloudComputing,
  IconDownload,
  IconFolder,
  IconSettings,
} from "@tabler/icons-react";

type Tab = "memory" | "projects" | "transfer" | "settings";

const TABS: { id: Tab; icon: typeof IconCloudComputing; label: string }[] = [
  { id: "memory",   icon: IconCloudComputing, label: "Memory"   },
  { id: "projects", icon: IconFolder,         label: "Projects" },
  { id: "transfer", icon: IconDownload,       label: "Transfer" },
  { id: "settings", icon: IconSettings,       label: "Settings" },
];

export default function Sidebar() {
  const [tab, setTab] = useState<Tab>("memory");

  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        gap: "4px",
        marginBottom: "16px",
        background: "rgba(255,255,255,0.45)",
        borderRadius: "14px",
        padding: "4px",
        border: "1px solid rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
      }}>
        {TABS.map(({ id, icon: Icon, label }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              title={label}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "34px",
                borderRadius: "10px",
                border: "none",
                background: active
                  ? "rgba(255,255,255,0.9)"
                  : "transparent",
                boxShadow: active
                  ? "0 1px 4px rgba(0,0,0,0.10)"
                  : "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Icon
                size={17}
                stroke={2}
                style={{
                  color: active ? "#CB2957" : "#9CA3AF",
                  transition: "color 0.15s ease",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {tab === "memory"   && <MemoryTab />}
        {tab === "projects" && <ProjectsTab />}
        {tab === "transfer" && <TransferTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}