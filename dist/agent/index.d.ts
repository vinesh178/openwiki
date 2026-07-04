import type { OpenWikiCommand, OpenWikiRunOptions, OpenWikiRunResult } from "./types.js";
export declare function runOpenWikiAgent(command: OpenWikiCommand, cwd?: string, options?: OpenWikiRunOptions): Promise<OpenWikiRunResult>;
export declare function createOpenWikiThreadId(cwd?: string): string;
