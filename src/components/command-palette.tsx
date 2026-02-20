"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileText, Briefcase, Mail, Moon, Sun, Link as LinkIcon, Home, Cpu } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Palette"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[20vh]"
        >
          <VisuallyHidden>
            <Dialog.Title>Global Command Palette</Dialog.Title>
            <Dialog.Description>Search for pages, commands, and actions.</Dialog.Description>
          </VisuallyHidden>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-xl shadow-2xl"
          >
            <div className="panel overflow-hidden border border-border bg-bg-elev">
              <div className="flex items-center border-b border-border px-4 py-3">
                <Terminal size={16} className="text-accent-secondary mr-3" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent font-mono text-sm text-text placeholder:text-text-dim focus:outline-none"
                />
                <span className="font-mono text-[10px] text-accent-muted border border-border/50 px-1.5 py-0.5 rounded-sm bg-bg-soft">ESC</span>
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
                <Command.Empty className="py-6 text-center font-mono text-sm text-text-dim">
                  NO_RESULTS_FOUND.
                </Command.Empty>

                <Command.Group heading={<div className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">Navigation</div>}>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <Home size={14} />
                    <span className="font-mono">Home</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/projects"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <Briefcase size={14} />
                    <span className="font-mono">Projects</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/writing"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <FileText size={14} />
                    <span className="font-mono">Writing</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/now"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <Cpu size={14} />
                    <span className="font-mono">Now Log</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/resume"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <FileText size={14} />
                    <span className="font-mono">Resume</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => router.push("/contact"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <Mail size={14} />
                    <span className="font-mono">Contact</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading={<div className="px-2 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">System</div>}>
                  <Command.Item
                    onSelect={() => runCommand(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    {resolvedTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    <span className="font-mono">Toggle Theme</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => {
                      navigator.clipboard.writeText(window.location.href);
                      // In a real app we might show a toast here
                    })}
                    className="flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 text-sm text-text-dim aria-selected:bg-bg-soft aria-selected:text-text transition-colors"
                  >
                    <LinkIcon size={14} />
                    <span className="font-mono">Copy Current URL</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
