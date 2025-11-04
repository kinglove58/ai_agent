import Image from "next/image";

interface EmptySpaceProps {
  title: string;
  description: string;
}
export const EmptySpace = ({ title, description }: EmptySpaceProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/empty.svg" alt="empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 text-center max-w-md mx-auto">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};
