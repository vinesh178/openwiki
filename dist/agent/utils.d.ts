import type { OpenWikiCommand, RunContext } from "./types.js";
export type OpenWikiContentSnapshot = string;
/**
 * Builds the per-run context the prompt uses to reason about prior docs and git changes.
 */
export declare function createRunContext(command: OpenWikiCommand, cwd: string): Promise<RunContext>;
/**
 * Records a successful init/update run so future updates can diff from this git head.
 */
export declare function writeLastUpdateMetadata(command: OpenWikiCommand, cwd: string, modelId: string): Promise<void>;
/**
 * Hashes OpenWiki content, excluding run metadata, to detect real documentation changes.
 */
export declare function createOpenWikiContentSnapshot(cwd: string): Promise<OpenWikiContentSnapshot>;
