import React from "react";

interface IPROPS {
    firstName?: string | undefined;
    lastName?: string | undefined;
    height?: string;
    width?: string;
    textSize?: string;
    profileImg?: string;
}
const ProfileDefaultImg: React.FC<IPROPS> = ({
    firstName,
    height,
    width,
    textSize,
    profileImg,
}) => {
    return (
        <>
            {profileImg && profileImg.length > 0 ? (
                <img
                    src={`${profileImg}?${Date.now()}`}
                    className={`inline-flex  ${width ? width : "w-9"} ${
                        height ? height : "h-9"
                    }  ${
                        textSize ?? "text-lg"
                    } items-center justify-center rounded-full bg-gray-500 text-white  uppercase`}
                />
            ) : (
                <span
                    className={`inline-flex  ${width ? width : "w-9"} ${
                        height ? height : "h-9"
                    }  ${
                        textSize ?? "text-lg"
                    } items-center justify-center rounded-full bg-gray-500 text-white  uppercase`}
                >
                    {firstName?.[0]}
                </span>
            )}
        </>
    );
};

export default ProfileDefaultImg;
