const EmptyState = () => {
    return (
        <div
            className="
                px-4
                py-10
                sm:px-6
                lg:px-8
                h-full
                flex
                justify-center
                items-center
                bg-[#ffffff]
                dark:bg-[#000000]
            "
        >
           <div className="text-center items-center flex flex-col">
                <h3
                    className="
                        mt-2
                        text-2xl
                        font-semibold
                        text-gray-900
                    "
                >
                    Sélectionnez un chat ou démarrez une nouvelle conversation
                </h3>
           </div>
        </div>
    );
}

export default EmptyState
