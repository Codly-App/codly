type ContainerProps = Readonly<{
    children: React.ReactNode;
    className?: string;
}>;

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`mx-auto w-400 max-w-full px-5 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
