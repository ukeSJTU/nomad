import type { UnderConstructionProps } from "@nomad/ui/components/common";
import { UnderConstruction } from "@nomad/ui/components/common";

export default function UnderConstructionContainer(
  props: UnderConstructionProps
) {
  return <UnderConstruction {...props} />;
}
