interface ProgrammingLanguageProps {
    label: string;
    icon: string;
}

const ProgrammingLanguage = ({ label, icon }: ProgrammingLanguageProps) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="bg-gray-500/10 p-4 rounded-xl w-fit">
                <img
                    className="w-10 h-10 object-contain"
                    src={icon}
                    alt={`${label} language icon`}
                />
            </div>
            <p>{label}</p>
        </div>
    );
};

export default ProgrammingLanguage;
