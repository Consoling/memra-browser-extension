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

export default function Sidebar() {
  const [tab, setTab] = useState<Tab>("memory");

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 16,
         
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.5)",
          paddingBottom: 8,
         
        }}
      >
        <button
          onClick={() => setTab("memory")}
            style={{
                display: "flex",
                alignItems: "center",
                width: 32,
                height: 32,
                justifyContent: "center",
            }}
        >
          <IconCloudComputing
            stroke={2}
            style={{
              color: tab === "memory" ? "#CB2957" : "#888",
            }}
          />
        </button>

        <button onClick={() => setTab("projects")} style={{
            display: "flex",
            alignItems: "center",
            width: 32,
            height: 32,
            justifyContent: "center",
        }}
        
        >
          <IconFolder
            stroke={2}
            style={{
              color: tab === "projects" ? "#CB2957" : "#888",
            }}
          />
        </button>

        <button onClick={() => setTab("transfer")} style={{
            display: "flex",
            alignItems: "center",
            width: 32,
            height: 32,
            justifyContent: "center",
        }}>
          <IconDownload
            stroke={2}
            style={{
              color: tab === "transfer" ? "#CB2957" : "#888",
            }}
          />
        </button>

        <button onClick={() => setTab("settings")} style={{
            display: "flex",
            alignItems: "center",
            width: 32,
            height: 32,
            justifyContent: "center",
        }}>
          <IconSettings
            stroke={2}
            style={{
              color: tab === "settings" ? "#CB2957" : "#888",
            }}
          />
        </button>
      </div>

      {tab === "memory" && <MemoryTab />}
      {tab === "projects" && <ProjectsTab />}
      {tab === "transfer" && <TransferTab />}
      {tab === "settings" && <SettingsTab />}
    </div>
  );
}
