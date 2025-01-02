import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ImCross } from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user } = useContext(UserContext)
    const [cat, setCat] = useState("") // No default category value
    const [cats, setCats] = useState([])

    const navigate = useNavigate()

    const deleteCategory = (i) => {
        let updatedCats = [...cats]
        updatedCats.splice(i, 1) // Corrected the splice to remove the category properly
        setCats(updatedCats)
    }

    const addCategory = () => {
        if (cat && !cats.includes(cat)) { // Check if category is not empty and not already in list
            let updatedCats = [...cats]
            updatedCats.push(cat)
            setCat("") // Reset the selected category after adding
            setCats(updatedCats)
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats
        }

        if (file) {
            const data = new FormData();
            data.append("file", file); // Aligns with backend multer field
            try {
                const imgUpload = await axios.post(`${URL}/api/upload`, data); // Ensure you are using the correct URL
                post.photo = imgUpload.data; // Update this based on the response
            } catch (err) {
                console.log(err);
            }
        }

        // Post upload
        try {
            const res = await axios.post("/api/posts/create", post, { withCredentials: true })
            navigate("/posts/post/" + res.data._id)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Navbar />
            <div className=' flex justify-center '>
                <div className='px-6 m-4 border flex flex-col w-[70%] shadow-xl md:px-[200px] mt-8'>
                    <h1 className='font-bold md:text-2xl text-2xl mt-3 flex justify-center '>Create a post</h1>
                    <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none' />
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4' />
                        <div className='flex flex-col'>
                            <div className='flex items-center space-x-4 md:space-x-8'>
                                <select name="" id="" value={cat} onChange={(e) => setCat(e.target.value)}>
                                    <option value="">Select Category</option>
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Big Data">Big Data</option>
                                    <option value="Blockchain">Blockchain</option>
                                    <option value="Business Management">Business Management</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                    <option value="Database">Database</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="Operating System">Operating System</option>
                                    <option value="Enterprise">Enterprise</option>
                                </select>
                                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
                            </div>

                            {/* categories */}
                            <div className='flex px-4 mt-3'>
                                {cats?.map((c, i) => (
                                    <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                        <p>{c}</p>
                                        <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <textarea onChange={(e) => setDesc(e.target.value)} rows={9} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description' />
                        <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg '>Create</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreatePost
