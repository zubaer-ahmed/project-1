import React from 'react'
import Blog from '.'

const Details = () => {
    return (
        <>
            <section className="bg-white">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">Continue Reading</h1>

                    <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                        <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

                        <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                            <p className="text-sm text-blue-500 uppercase">category</p>

                            <a href="#" className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline">
                                All the features you want to know
                            </a>

                            <p className="mt-3 text-sm text-gray-500 md:text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                                laudantium quia tempore delect
                            </p>

                            <div className="flex items-center mt-6">
                                <img className="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                                <div className="mx-4">
                                    <h1 className="text-sm text-gray-700">Amelia. Anderson</h1>
                                    <p className="text-sm text-gray-500">Lead Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Blog />
        </>
    )
}

export default Details