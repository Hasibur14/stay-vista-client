import { useState } from "react";
import { Helmet } from "react-helmet-async";
import imageUpload from "../../../api/utils";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";


const AddRoom = () => {

    const { user } = useAuth()
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')

    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    //date range handler
    const handledDate = item => {
        console.log(item)
        setDates(item.selection)
    };


    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const to = dates.startDate
        const from = dates.endDate
        const price = form.price.value
        const guest = form.guest.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const bedrooms = form.bedrooms.value
        const image = form.image.files[0]
        const host = {
            name: user?.displayName,
            image: user.photoURL,
            email: user?.email
        }

        try {
            const image_url = await imageUpload(image);
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                guest,
                bathrooms,
                description,
                bedrooms,
                image_url,
                host
            };
            console.table(roomData)

        } catch (err) {
            console.log(err)
        }
    };

    //handle image change
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    return (

        <div>

            <Helmet>
                <title>Add Room | Dashboard</title>
            </Helmet>

            {/* Form */}
            <AddRoomForm
                dates={dates}
                handledDate={handledDate}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imageText={imageText}
            ></AddRoomForm>

        </div>
    );
};

export default AddRoom;