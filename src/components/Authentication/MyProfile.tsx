// 'use client'
// import { useAuthProvider } from '@/Providers/AuthProvider';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';


// interface User {

//     name?: string;
//     email?: string;
//     phone?: string;
//     address?: string;
//     division?: string;
//     district?: string;
//     thana?: string;
//     union?: string;
//     postCode?: string;
//     image?: string;

// }
// const MyProfile = () => {
//     const { user, loading } = useAuthProvider()
//     const [userInfo, setUserInfo] = useState<User>({})
//     const [spinner, setSpinner] = useState<boolean>(true)
//     useEffect(() => {
//         async function getUserInfo() {

//             if (!user?.email) {
//                 return
//             }
//             try {
//                 setSpinner(true)
//                 const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/singleUserInfo/${user?.id}`, { withCredentials: true })
//                 const result = res.data?.user
//                 setUserInfo(result)
//                 setSpinner(false)
//             } catch (error) {
//                 console.log(error);
//                 // console.log(error.message);

//             }
//         }

//         getUserInfo()

//     }, [user?.email, user?.id])

//     if (loading || spinner) {
//         return <p className="mt-4 text-lg font-medium text-gray-700">লোড হচ্ছে...</p>
//     }
//     console.log(userInfo);


//     return (
//         <div>

//         </div>
//     );
// };

// export default MyProfile;
















'use client'
import { useAuthProvider } from '@/Providers/AuthProvider';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { MdLocationCity, MdPostAdd } from 'react-icons/md';

interface User {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    division?: string;
    district?: string;
    thana?: string;
    union?: string;
    postCode?: string;
    image?: string;
}

const MyProfile = () => {
    const { user, loading } = useAuthProvider()
    const [userInfo, setUserInfo] = useState<User>({})
    const [spinner, setSpinner] = useState<boolean>(true)
   
    useEffect(() => {
        async function getUserInfo() {
            if (!user?.email) return;
            
            try {
                setSpinner(true)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/singleUserInfo/${user?.id}`, { 
                    withCredentials: true 
                })
                const result = res.data?.user
                setUserInfo(result)
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setSpinner(false)
            }
        }

        getUserInfo()
    }, [user?.email, user?.id])

    if (loading || spinner) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4 mx-auto" />
                    <p className="text-lg font-medium text-gray-700">লোড হচ্ছে...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">আমার প্রোফাইল</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Profile Header with Image */}
                <div className="bg-blue-600 p-4 text-white flex items-center">
                    <div className="mr-4">
                        {userInfo.image ? (
                            <img 
                                src={userInfo.image} 
                                alt="Profile" 
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                                <FaUser className="text-2xl" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">{userInfo.name || "নাম পাওয়া যায়নি"}</h2>
                        <p className="text-blue-100">{userInfo.email}</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">ব্যক্তিগত তথ্য</h3>
                        
                        <div className="flex items-start">
                            <FaEnvelope className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">ইমেইল</p>
                                <p className="font-medium">{userInfo.email || "উপলব্ধ নয়"}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <FaPhone className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">ফোন নম্বর</p>
                                <p className="font-medium">{userInfo.phone || "উপলব্ধ নয়"}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">ঠিকানা</p>
                                <p className="font-medium">{userInfo.address || "উপলব্ধ নয়"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">অবস্থান তথ্য</h3>
                        
                        <div className="flex items-start">
                            <MdLocationCity className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">বিভাগ/জেলা</p>
                                <p className="font-medium">
                                    {userInfo.division || "উপলব্ধ নয়"} {userInfo.district && `, ${userInfo.district}`}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <MdLocationCity className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">থানা/ইউনিয়ন</p>
                                <p className="font-medium">
                                    {userInfo.thana || "উপলব্ধ নয়"} {userInfo.union && `, ${userInfo.union}`}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <MdPostAdd className="text-blue-500 mt-1 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">পোস্ট কোড</p>
                                <p className="font-medium">{userInfo.postCode || "উপলব্ধ নয়"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="px-4 pb-4 md:px-6">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                        প্রোফাইল সম্পাদনা করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;