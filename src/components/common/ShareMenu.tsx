import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import { toast } from "react-toastify";

interface ShareMenuProps {
  url: string; 
  isShareMenuVisible: boolean;
}
const ShareMenu: React.FC<ShareMenuProps> = ({ url, isShareMenuVisible }) => {
  const shareUrl = url;
  const title = "Check out this awesome image!";

  // Copy the URL to the clipboard
  const handleCopyLink = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      {isShareMenuVisible && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Share</h3>
          <div className="flex flex-wrap gap-3">
            {/* Share options */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="rounded-full mt-2 text-black"
                onClick={() => handleCopyLink(url)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 text-sm">Copy Link</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <span className="text-gray-700 text-sm">WhatsApp</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="YOUR_FACEBOOK_APP_ID"
              >
                <FacebookMessengerIcon size={32} round={true} />
              </FacebookMessengerShareButton>

              <span className="text-gray-700 text-sm">Messenger</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FacebookShareButton url={shareUrl} title={title}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <span className="text-gray-700 text-sm">Facebook</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <span className="text-gray-700 text-sm">X</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default ShareMenu;
