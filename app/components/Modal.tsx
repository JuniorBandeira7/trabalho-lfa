"use client";

import { ReactNode, useEffect } from "react";
import "./modal.css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={title || "Modal"}
                onClick={(event) => event.stopPropagation()}
            >
                <div className="modal-header text-black">
                    {title && <h2>{title}</h2>}

                    <button
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Fechar modal"
                    >
                        ×
                    </button>
                </div>

                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
}