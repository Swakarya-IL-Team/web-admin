import React, {useState, useEffect} from 'react';
import PlusIcon from "/src/assets/icons/Plus.png";
import DeleteIcon from "/src/assets/icons/delete.png";
import AddInfoCollection from '../../components/AddInfoCollection';
import EditInfoCollection from '../../components/EditInfoCollection';
import MuseumCollectionData from '../../dataSample/MuseumCollectionData';
import axios from 'axios';

const MuseumCollectionScreen = () => {
    const [isAddData, setIsAddData] = useState(false);
    const [isEditData, setIsEditData] = useState(false);
    const [collectionData, setCollectionData] = useState([]);
    const [idToEdit, setIdToEdit] = useState(null);

    useEffect(() => {
        fetchCollectionData();
    }, []);

    const fetchCollectionData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/collection/getAllCollection');
            console.log(response.data.data);
            setCollectionData(response.data.data);
        } catch (error) {
            console.error("Error fetching collection:", error);
        }
    };

    const handleAddData = () => {
        setIsAddData(true)
    };

    const handleCloseAddData = () => {
        setIsAddData(false);
    };

    const handleEditData = () => {
        setIsEditData(true);
    };

    const handleCloseEditData = () => {
        setIsEditData(false);
    };

    const handleDeleteCollection = async() => {
    };

    return (
        <>
            <div className="flex-1 ml-[260px] mt-5 bg-[#F8F8F8] h-screen">
                <div className='flex flex-col space-y-8 pb-10'>
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='font-bold text-black text-[24px]'>
                            Museum Collection
                        </h1>
                        <button
                            className='bg-[#7F9275] rounded-[8px] text-white px-5 py-3'
                            onClick={handleAddData}
                        >
                            +   Add Museum Collection
                        </button>
                    </div>
                    {MuseumCollectionData.length === 0 ? (
                        <div className=" bg-white mb-[50px] p-10 rounded-[8px] shadow-[0px_8px_28px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-center space-y-10">
                            <h1 className="text-black font-bold text-[20px]">
                                You don’t have any data about the museum collection
                            </h1>
                            <div className="flex flex-row justify-center items-center space-x-5" onClick={handleAddData}>
                                <img src={PlusIcon} alt="" className="w-[24px] h-[24px]" />
                                <button>
                                    Add Museum Collection
                                </button>
                            </div>
                        </div>
                    ) : (
                        MuseumCollectionData.map((koleksi, index) => (
                            <div key={index} className="flex flex-col w-full mb-[50px] px-7 py-8 space-y-5 border rounded-lg shadow-custom-shadow bg-white">
                                <div className="flex flex-row w-full space-x-5">
                                    <img src={koleksi.image} alt="" className="w-[200px] h-[150px]"/>
                                    <div className="flex flex-col justify-start space-y-3">
                                        <h1 className="font-bold text-[20px]">
                                            {koleksi.titleCollection}
                                        </h1>
                                        <p className="font-light text-[14px]">
                                            {koleksi.descCollection}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-end items-center space-x-4">
                                    <button
                                        className="bg-[#728969] px-5 py-2 rounded-[8px] text-white"
                                        onClick={() => handleEditData()}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-[#FC5C65] px-5 py-2 rounded-[8px]"
                                        onClick={() => handleDeleteCollection()}
                                    >
                                        <img src={DeleteIcon} alt="" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {isAddData && (
                    <div className="fixed ml-[280px] pt-[120px] inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-60 overflow-y-auto">
                        <AddInfoCollection onClose={handleCloseAddData}/>
                    </div>
                )}
                {isEditData && (
                    <div className="fixed ml-[280px] pt-[120px] inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-60 overflow-y-auto">
                        <EditInfoCollection onClose={handleCloseEditData}/>
                    </div>
                )}
            </div>
        </>
    );
};

export default MuseumCollectionScreen;
