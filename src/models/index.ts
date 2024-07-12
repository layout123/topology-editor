const modulesFiles = import.meta.glob(['./*/**/index.ts', '!./index.ts', '!./types.ts'], { eager: true });
const extractDirectoryName = (path: string): string => {
  return path.replace(/\/[^/]+$/, '');
};

export const customs = Object.entries(modulesFiles).reduce(
  (customs, [key, value]) => ({ ...customs, [extractDirectoryName(key)]: value }),
  {}
);
export default customs;
