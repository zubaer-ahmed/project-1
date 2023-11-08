export default () => {

    const stats = [
        {
          data: "35K",
          title: "Users",
        },
        {
          data: "40+",
          title: "Cities",
        },
        {
          data: "4M+",
          title: "Workers",
        },
      ];

    return (
        <section className="hidden sm:block md:visible lg:visible">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="mt-12">
                    <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
                        {
                            stats.map((item, idx) => (
                                <li key={idx} className="text-center px-12 md:px-16">
                                    <h4 className="text-4xl text-blue-600 font-semibold">{item.data}</h4>
                                    <p className="mt-3 font-medium">{item.title}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}