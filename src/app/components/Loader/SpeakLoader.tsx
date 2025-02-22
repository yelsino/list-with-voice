import React from "react";
import styles from "./SpeakLoader..module.css";

export const SpeakLoader = () => {
    return (
        <div className="flex items-center gap-x-3">
            <svg
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                height="30"
                width="30"
            >
                <path
                    d="M159.99414,31.9971v192a7.99386,7.99386,0,0,1-12.90625,6.3125L77.24414,175.9971h-45.25a16.01582,16.01582,0,0,1-16-16v-64a16.01583,16.01583,0,0,1,16-16h45.25l69.84375-54.3125a7.99451,7.99451,0,0,1,12.90625,6.3125Z"
                    fill="#05fffb"
                ></path>
            </svg>
            <span className={styles.speak_loader}></span>
        </div>
    );
};
