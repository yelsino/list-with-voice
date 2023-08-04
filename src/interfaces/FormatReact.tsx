import React from "react";

export function formatText(input: string): React.ReactNode {
    const words = input.trim().split(" ");
    const totalWords = words.length;

    if (totalWords === 3) {
        return (
            <React.Fragment>
                {words[0]} <br />
                {words[1]} {words[2]}
            </React.Fragment>
        );
    }

    return input;
}
