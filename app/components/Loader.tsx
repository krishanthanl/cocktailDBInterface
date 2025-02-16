const Loader = () => {
    return(
        <div className="flex justify-center items-center h-16" role="status" aria-label="Loading">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}


Loader.displayName = 'Loader';
export default Loader;