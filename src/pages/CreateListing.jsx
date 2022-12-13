import { getAuth } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { uuidv4 } from '@firebase/util'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'

function CreateListing() {
    const [loading, setLoading] = useState(false)
    const auth = getAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        type: "rent",
        bedrooms: 0,
        bathrooms: 0,
        parking: true,
        furnished: true,
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,
        lat: 0,
        lng: 0,
        images: {},
        timestamp: serverTimestamp(),
        userRef: auth.currentUser.uid
    })

    const handleString = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }
    const handleNumber = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : Number(e.target.value)
        }))
    }
    const handleBoolean = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : (e.target.value === 'true')
        }))
    }
    const handleImages = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            images: e.target.files
        }))
    }
    const storeImages = async(image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage() 
            const fileExtension = `images/${image.name}/${uuidv4()}`
            const storageRef = ref(storage, fileExtension)

            const uploadTask = uploadBytesResumable(storageRef, image);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                // case 'paused':
                //     console.log('Upload is paused');
                //     break;
                // case 'running':
                //     console.log('Upload is running');
                //     break;
                // }
            }, 
            (error) => {
                reject(error)
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
                });
            }
            );
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const imgUrls = await Promise.all(
            [...formData.images].map((image) => storeImages(image))
        ).catch(()=>{
            setLoading(false)
            toast.error("Unable to save image")
        })
        const formDataCopy = {...formData, imageUrls: imgUrls}
        delete formDataCopy.images
        delete formDataCopy.lat
        delete formDataCopy.lng
        !formDataCopy.offer && delete formDataCopy.discountedPrice
        const docRef = await addDoc(collection(db, "listings"), formDataCopy)
        console.log(docRef)
        setLoading(false)
        toast.success("Succesfully created an Ad")
        navigate(`catagory/${formDataCopy.type}/${docRef.id}`)
    }

  return loading ? <h1>Loading...</h1> : (
    <div className='mx-6 max-w-lg'>
        <h1 className='text-4xl font-extrabold'>Create a Listing</h1>
        <form className='mt-8 flex flex-col gap-5' onSubmit={handleSubmit}>
            <section>
                <label className='text-sm font-bold'>Sell/Rent</label>
                <div className='mt-2 flex gap-2'>
                    <button type='button' id='type' value='sale' onClick={handleString} className={`text-sm py-3 px-10 rounded-xl ${formData.type === 'rent' ? 'bg-white' : 'bg-green-400 text-white'}`}>Sell</button>
                    <button type='button' id='type' value='rent' onClick={handleString} className={`text-sm py-3 px-10 rounded-xl ${formData.type === 'sale' ? 'bg-white' : 'bg-green-400 text-white'}`}>Rent</button>
                </div>
            </section>
            <section>
                <p className='text-sm font-bold mb-1'>Name</p>
                <input type="text" id="name" className='w-full rounded-lg py-1 px-2 focus:outline-none focus:bg-blue-50' value={formData.name} onChange={handleString}/>
            </section>
            <section className='flex gap-3'>
                <div className='flex flex-col items-center'>
                    <p className='text-sm font-bold'>Bedrooms</p>
                    <input type="number" id="bedrooms" className='px-3.5 mt-2 w-14 py-1 rounded-lg' value={formData.bedrooms} onChange={handleNumber}/>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-sm font-bold'>Bathrooms</p>
                    <input type="number" id="bathrooms" className='px-3.5 mt-2 w-14 py-1 rounded-lg' value={formData.bathrooms} onChange={handleNumber}/>
                </div>
            </section>
            <section>
                <label className='text-sm font-bold'>Parking spot</label>
                <div className='mt-2 flex gap-2'>
                    <button type='button' id='parking' value = {true} onClick={handleBoolean} className={`text-sm py-3 px-10 rounded-xl ${formData.parking ? 'bg-green-400 text-white' : 'bg-white'}`}>Yes</button>
                    <button type='button' id='parking' value = {false} onClick={handleBoolean} className={`text-sm py-3 px-10 rounded-xl ${formData.parking ? 'bg-white' : 'bg-green-400 text-white'}`}>No</button>
                </div>
            </section>
            <section>
                <label className='text-sm font-bold'>Furnished</label>
                <section className='mt-2 flex gap-2'>
                    <button type='button' className={`text-sm py-3 px-10 rounded-xl ${formData.furnished ? "bg-green-400 text-white" : "bg-white"}`} value={true} onClick={handleBoolean} id="furnished">Yes</button>
                    <button type='button' className={`text-sm py-3 px-10 rounded-xl ${formData.furnished ? "bg-white" : "bg-green-400 text-white"}`} value={false} onClick={handleBoolean} id="furnished">No</button>
                </section>
            </section>
            <section>
                <p className='text-sm font-bold'>Address</p>
                <textarea id="location" cols="30" rows="3" value={formData.location} onChange={handleString} className="w-full p-1 mt-2 rounded-lg focus:border-green-400"></textarea>
            </section>
            <section>
                <label className='text-sm font-bold'>Offer</label>
                <section className='mt-2 flex gap-2'>
                    <button type='button' className={`text-sm py-3 px-10 rounded-xl ${formData.offer ? "bg-green-400 text-white" : "bg-white"}`} value={true} onClick={handleBoolean} id="offer">Yes</button>
                    <button type='button' className={`text-sm py-3 px-10 rounded-xl ${formData.offer ? "bg-white" : "bg-green-400 text-white"}`} value={false} onClick={handleBoolean} id="offer">No</button>
                </section>
            </section>
            <section>
                <label className='text-sm font-bold'>Regular Price</label>
                <section className='mt-2 flex gap-2 items-center'>
                    <input type="number" id="regularPrice" className='px-3.5 mt-2 w-20 py-1 rounded-lg' value={formData.regularPrice} onChange={handleNumber}/>
                    <p className='text-sm font-bold'>{`$ ${formData.type === 'rent' ? " / Month" : ""}`}</p>
                </section>
            </section>
            {formData.offer && <section>
                <label className='text-sm font-bold'>Discounted Price</label>
                <section className='mt-2 flex gap-2 items-center'>
                    <input type="number" id="discountedPrice" className='px-3.5 mt-2 w-20 py-1 rounded-lg' value={formData.discountedPrice} onChange={handleNumber}/>
                    <p className='text-sm font-bold'>{`$ ${formData.type === 'rent' ? " / Month" : ""}`}</p>
                </section>
            </section>}
            <section className='flex flex-col gap-2'>
                <p className='text-sm font-bold'>Images</p>
                <p className='font-light text-zinc-600 text-sm'>The first image will be the cover image (max 6)</p>
                <div className='bg-white'>
                    <input type="file" id='images' max='6' accept=".jp,.png,.jpeg" multiple required onChange={handleImages} className="text-sm font-bold"/>
                </div>
            </section>
            <button type='submit' className='mt-12 bg-green-400 text-white rounded-xl py-2 w-40 mx-auto transition-all hover:-translate-y-0.5 hover:shadow-lg duration-300'>Create Listing</button>
        </form>
    </div>
  )
}

export default CreateListing