import odlaw from "~assets/odlaw.webp";
import waldo from "~assets/waldo.webp";
import wizard from "~assets/wizard.webp";

export default function TargetsMenu() {
  return (
    <div role="menu" className="flex flex-col bg-neutral-700/70">
      <TargetButton image={waldo} name="Waldo" />
      <TargetButton image={wizard} name="Wizard" />
      <TargetButton image={odlaw} name="Odlaw" />
    </div>
  );
}

interface TargetButtonProps {
  image: string;
  name: string;
}

function TargetButton({ image, name }: TargetButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 p-2 font-medium text-neutral-100 hover:bg-neutral-300/70"
    >
      <img className="size-10 object-cover object-top" src={image} alt="" />
      {name}
    </button>
  );
}
