import type { IconType } from "react-icons";
import {
  SiAngular,
  SiCplusplus,
  SiDocker,
  SiFlask,
  SiGit,
  SiGooglecloud,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNodedotjs,
  SiOpencv,
  SiOpenjdk,
  SiOpentelemetry,
  SiPython,
  SiReact,
  SiTensorflow,
  SiTypescript,
  SiMysql,
  SiExpress,
  SiSocketdotio,
  SiVite,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";

const map: Record<string, IconType> = {
  Python: SiPython,
  "C++": SiCplusplus,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  SQL: SiMysql,
  React: SiReact,
  Angular: SiAngular,
  "Node.js": SiNodedotjs,
  "Material UI": SiMui,
  TensorFlow: SiTensorflow,
  OpenCV: SiOpencv,
  Docker: SiDocker,
  Git: SiGit,
  AWS: FaAws,
  Azure: VscAzure,
  GCP: SiGooglecloud,
  MongoDB: SiMongodb,
  Flask: SiFlask,
  OpenTelemetry: SiOpentelemetry,
  Express: SiExpress,
  "Socket.IO": SiSocketdotio,
  Vite: SiVite,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name];
  if (!Icon) return null;
  return <Icon aria-hidden className={className} />;
}

export const hasTechIcon = (name: string) => name in map;
