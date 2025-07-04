interface TagProps {
  children: React.ReactNode;
}
export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <div className="bg-theme-primary text-white text-sm px-[12px] py-[6px] rounded-md flex items-center justify-center">
      {children}
    </div>
  );
};
