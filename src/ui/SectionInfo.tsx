type Infos = Readonly<{
    icon?: React.ReactNode;
    title?: string;
    subTitle?: string;
}>;

export default function SectionInfo({icon, title, subTitle}: Infos) {
    return (
        <>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-lavender px-3 py-1.5 text-xs font-semibold text-primary">
                {!!icon && icon}
                <span>{!!subTitle && subTitle}</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-4xl mb-8 tracking-tight text-foreground">
                {!!title && title}
            </h2>
        </>
    )
}
