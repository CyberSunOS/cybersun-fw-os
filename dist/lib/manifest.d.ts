export declare const MANIFEST_FILE = ".seedfw-manifest.json";
export interface Manifest {
    seedfwVersion: string;
    files: Record<string, string>;
}
export declare function hashContent(content: Buffer | string): string;
export declare function hashFile(filePath: string): Promise<string>;
/** List framework-owned files under root, as relative paths. */
export declare function collectFrameworkFiles(root: string): Promise<string[]>;
/** Build a manifest describing the framework files currently under root. */
export declare function buildManifest(root: string, version: string): Promise<Manifest>;
export declare function writeManifest(root: string, manifest: Manifest): Promise<void>;
export declare function readManifest(root: string): Promise<Manifest | null>;
//# sourceMappingURL=manifest.d.ts.map