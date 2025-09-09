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
      className="flex cursor-pointer gap-2 text-neutral-100"
    >
      <img className="size-8 object-contain" src={image} alt="" />
      {name}
    </button>
  );
}
