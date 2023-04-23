// import React, { useState } from 'react';
// import { View, Button, Image } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';

// const Test = () => {
//     const [avatar, setAvatar] = useState(null);

//     const handleSelectAvatar = async () => {
//         try {
//             const image = await ImagePicker.openPicker({
//                 width: 300,
//                 height: 300,
//                 cropping: true,
//             });

//             setAvatar(image.path);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <View style={{ paddingTop: 30, alignItems: 'center' }}>
//             {avatar ? (
//                 <Image source={{ uri: avatar }} style={{ width: 300, height: 300, marginTop: 100, alignSelf: 'center' }} />
//             ) : (
//                 <Button title="Select Avatar" onPress={handleSelectAvatar} />
//             )}
//         </View>
//     );
// };

// export default Test;

import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { updateUserProfilePic } from '../../api/auth';

const AvatarPicker = () => {
    const [avatar, setAvatar] = useState(null);
    const userId = '64193927b09723656fa0250c'

    const handleSelectAvatar = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
            });

            const formData = new FormData();
            formData.append('file', {
                uri: image.path,
                type: image.mime,
                name: image.path.split('/').pop(),
            });

            const response = await updateUserProfilePic(userId, formData)
            console.log('reeeeeeeeeeeeeeeeee', response)
            // setAvatar(response.data.image);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ paddingTop: 30, alignItems: 'center' }}>
            {avatar ? (
                <Image source={{ uri: avatar }} style={{ width: 300, height: 300 }} />
            ) : (
                <Button title="Select Avatar" onPress={handleSelectAvatar} />
            )}
        </View>
    );
};

export default AvatarPicker;

