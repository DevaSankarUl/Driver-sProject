import React, { useState } from "react";
import { axiosAdminInstance } from '../Axios/Axios'
function AdminCarWashForm() {
    const [val, setVal] = useState([]);
    const [name, setName] = useState('');
    const [price, setAmount] = useState('')

    const [previewSource1, setPreviewSource1] = useState();
    const [previewSource2, setPreviewSource2] = useState();
    const [previewSource3, setPreviewSource3] = useState();
    const [previewSource4, setPreviewSource4] = useState();
    const [fileInputState, setFileInputState] = useState('');
    const [error, setError] = useState('')
    // const navigate=useNavigate();


    // const { register, handleSubmit, reset } = useForm()

    console.log("hey val", val);
    const handleFileInputChange1 = (e) => {
        const file = e.target.files[0];
        previewFile1(file);
    };
    const handleFileInputChange2 = (e) => {
        const file = e.target.files[0];
        previewFile2(file);
    };
    const handleFileInputChange3 = (e) => {
        const file = e.target.files[0];
        previewFile3(file);
    };
    const handleFileInputChange4 = (e) => {
        const file = e.target.files[0];
        previewFile4(file);
    };

    const previewFile1 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource1(reader.result);
        };
    };
    const previewFile2 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource2(reader.result);
        };
    };
    const previewFile3 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource3(reader.result);
        };
    };
    const previewFile4 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource4(reader.result);
        };
    };

    let values = {};

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!previewSource1) return;
        if (!previewSource2) return;
        if (!previewSource3) return;
        if (!previewSource4) return;
        const uploadImage = async (base64EncodedImage) => {
            const { imageData } = await uploadDocuments(base64EncodedImage)
            console.log(imageData, 'in uploadImage');
            console.log(imageData.url);
            if (imageData.url) {
                return imageData.url
            } else {
                setError('Image upload failed')
            }
        }
        const firstImage = await uploadImage(previewSource1);
        const secondImage = await uploadImage(previewSource2);
        const thirdImage = await uploadImage(previewSource3);
        const fourthImage = await uploadImage(previewSource4)

        if (firstImage && secondImage && thirdImage && fourthImage) {
            values.firstImage = firstImage
            values.secondImage = secondImage
            values.thirdImage = thirdImage
            values.fourthImage = fourthImage
            values.materials = val
            values.washname = name
            values.price = price

            const res = await axiosAdminInstance.post('/insertValues', {
                data: values
            })
            //    const token= localStorage.getItem('expertToken')
            //    const response=await expertApplyVerification(token,values)
            //    if (response.status === 'ok') {
            //     navigate('/expertProfile');
            //   } else {
            //     setError('Documents upload failed');
            //   }
        }

        uploadDocuments(values)
        console.log(values);
    };

    const uploadDocuments = async (values) => {

        const { data } = await axiosAdminInstance.post('/uploadDocuments', {
            data: values,
            headers: { 'Content-type': 'application.json' },
        });

        if (data.status) {
            return data;
        }
    };
    // const onSubmit = async (data, val, uploadImage) => {
    //     try {
    //         const formdata = { input: data, value: val, imges: uploadImage }
    //         console.log("hai formdata", formdata);

    //         const response = await axiosAdminInstance.post('/carwash', formdata)
    //         console.log(response);
            // reset()
    //     } catch (err) {
    //         console.log();
    //     }
    // }
    // const uploadImage = []
    // fileList.forEach(element => {
    //     uploadImage.push(element)
    // })



    const handleAdd = () => {
        const abc = [...val, []]
        setVal(abc)
    }
    const handleChange = (onChangeValue, i) => {
        const inputdata = [...val]
        inputdata[i] = onChangeValue.target.value;
        setVal(inputdata)
    }
    const handleDelete = (i) => {
        const deletVal = [...val]
        deletVal.splice(i, 1)
        setVal(deletVal)
    }
    console.log(val, "data-")
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);


    };
    //


    return (
        <div>
            <div className="py-20 h-screen bg-gray-300 px-2">
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                    <div className="md:flex">
                        <div className="w-full">



                            <div className="p-4 border-b-2">

                                <span className="text-lg font-bold text-gray-600">Add documents</span>

                            </div>

                            {/* <form onSubmit={handleSubmit((data) => onSubmit(data, val, uploadImage))} */}

                            <form onSubmit={handleSubmit}
                                className="p-3">

                                <div className="mb-2">
                                    <span className="text-sm">Type of Wash</span>
                                    <input type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        id='name'
                                        name='name'
                                        // {...register('name')}
                                        className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300" />
                                </div>
                                <div className="mb-2">
                                    <span className="text-sm">Amount</span>
                                    <input type="number"
                                        id='price'
                                        value={price}
                                        onChange={(e) => setAmount(e.target.value)}
                                        name='price'
                                        // {...register('price')}
                                        className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300" />
                                </div>

                                <div className="mb-2">


                                    <button onClick={() => handleAdd()}>Material</button>
                                    {val.map((data, i) => {
                                        return (
                                            <div>
                                                <input value={data} className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                                                    onChange={e => handleChange(e, i)} />
                                                <button onClick={() => handleDelete(i)}>x</button>
                                            </div>
                                        )
                                    })}


                                </div>
                                <div className="mt-3 text-center pb-3">


                                    <label className="font-bold text-xs">First material</label>
                                    {previewSource1 && (
                                        <img src={previewSource1} className="h-20" alt="profile pic" />
                                    )}
                                    <input
                                        className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                                        type="file"
                                        name="profilepic"
                                        id="profilepic"
                                        value={fileInputState}
                                        onChange={handleFileInputChange1}

                                    />

                                    <label className="font-bold text-xs">Second Material</label>
                                    {previewSource2 && (
                                        <img src={previewSource2} className="h-20" alt="profile pic" />
                                    )}
                                    <input
                                        className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                                        type="file"
                                        name="idproof"
                                        id="idproof"
                                        value={fileInputState}
                                        onChange={handleFileInputChange2}

                                    />

                                    <label className="font-bold text-xs mt-3" htmlFor="passwordField">
                                        Third material
                                    </label>
                                    {previewSource3 && (
                                        <img src={previewSource3} className="h-20" alt="profile pic" />
                                    )}
                                    <input
                                        className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                                        type="file"
                                        name="licensepic"
                                        id="licensepic"
                                        value={fileInputState}
                                        onChange={handleFileInputChange3}

                                    />

                                    <label className="font-bold text-xs mt-3" htmlFor="passwordField">
                                        Fourth material
                                    </label>
                                    {previewSource4 && (
                                        <img src={previewSource4} className="h-20" alt="profile pic" />
                                    )}
                                    <input
                                        className="flex items-center h-12 px-6 w-80 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                                        type="file"
                                        name="liscencepic2"
                                        i="liscencepic2"
                                        value={fileInputState}
                                        onChange={handleFileInputChange4}

                                    />


                                    {/* <ImgCrop rotate>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                        >
                                            {fileList.length < 5 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop> */}
                                    <button className="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white  :bg-blue-700"
                                        type='submit'>Create</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminCarWashForm;