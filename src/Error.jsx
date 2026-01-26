function ErrorPage() {
    return (
        <section
            className={"border-5 border-blue-700 p-2 rounded-2xl bg-blue-400 w-3/4 mx-auto h-150 flex flex-col gap-5"}>
            <h1 className={"text-4xl font-bold text-center pt-10"}>404</h1>
            <p className={"text-2xl font-bold text-center"}>Not found.</p>
        </section>
    );
}

export default ErrorPage