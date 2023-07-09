import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { equalsIgnoreCase, getDateString, isObject } from "../utils";

export default function Modal({
  isOpen,
  setIsOpen,
  modalContents,
  customContent,
  children,
  title,
  type,
  onStatusChange,
}) {
  const [modalKeys, setModalKeys] = useState();
  const [contents, setContents] = useState();

  useEffect(() => {
    isObject(contents) && setModalKeys(Object.keys(contents));
  }, [contents]);

  useEffect(() => {
    setContents(modalContents);
  }, [modalContents]);

  return (
    <div className={`modal-container ${isOpen ? "open" : "hidden"}`}>
      {(contents || customContent) && (
        <div className={`modal ${isOpen ? "open" : "hidden"}`}>
          <div className="modal-header">
            {title && <div className="title">{title}</div>}
            <div
              className="modal-close-button"
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
          {customContent ? (
            children
          ) : (
            <div className="modal-items-container">
              {modalKeys &&
                modalKeys.map((item, index) => (
                  <div className="modal-item" key={index}>
                    <div className="modal-item-title">{item}</div>
                    <div className="modal-item-desc">
                      {equalsIgnoreCase(item, "registeredTime") ||
                      equalsIgnoreCase(item, "updatedTime")
                        ? getDateString(contents[item])
                        : contents[item]}
                    </div>
                  </div>
                ))}
            </div>
          )}
          {contents && type && (
            <div className="modal-buttons-container">
              {type === "employee" && (
                <>
                  {!equalsIgnoreCase(contents.status, "unable to resolve") &&
                    !equalsIgnoreCase(contents.status, "verified") && (
                      <div
                        className="button red"
                        onClick={() => {
                          onStatusChange(contents.id, "Unable To Resolve");
                          setIsOpen(false);
                        }}
                      >
                        Report
                      </div>
                    )}
                  {!equalsIgnoreCase(contents.status, "resolved") &&
                    !equalsIgnoreCase(contents.status, "verified") && (
                      <div
                        className="button"
                        onClick={() => {
                          onStatusChange(contents.id, "Resolved");
                          setIsOpen(false);
                        }}
                      >
                        Resolve
                      </div>
                    )}
                </>
              )}
              {type === "student" &&
                equalsIgnoreCase(contents.status, "resolved") && (
                  <div
                    className="button"
                    onClick={() => {
                      onStatusChange(contents.id, "verified");
                      setIsOpen(false);
                    }}
                  >
                    Verify
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
