import React from 'react'

export default function Table({ data }) {



    return (
        <>
            <div className='overflow-x-auto'>
                {data.length === 0 ? <span className='absolute top-[50%] left-[50%]'>No such data found</span> :
                    <table className='lg:mx-auto max-md:w-[200%] max-lg:w-[150%] lg:w-[95%]  mt-10 text-left border-collapse border border-slate-100 shadow-2xl'>
                        <thead className='h-12 rounded-3xl bg-red-300'>
                            <tr>
                                <th className='px-10'>Id</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Website</th>
                            </tr>

                        </thead>
                        <tbody className=''>{
                            data.map((elem, index) => <tr className={`h-12 border-collapse border ${index % 2 === 0 ? 'bg-slate-200' : 'bg-white'}`} key={index}>
                                <td className='px-10'>{elem.id}</td>
                                <td>{elem.username}</td>
                                <td>{elem.name}</td>
                                <td>{elem.email}</td>
                                <td>{elem.website}</td>
                            </tr>)
                        }
                        </tbody>
                    </table>}
            </div>
        </>
    )
}
