import { db } from "./../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export interface paymentDetailsSchema {
  buyerUID: string;
  buyerUsername: string;
  buyerEmail: string;
  buyerName?: string;
  buyerPhoto?: any;
  buyerPhoneNumber?: string;
  recipientData?: {
    reciepientUID?: string; //include this
    recipientUsername: string;
    recipientEmail?: string; // include this
  };
  amount: number;
  timestamp?: string;
  transactionSuccess: "success" | "failed" | "in process";
  transactionType: "Creator Support" | "NFT Purchase";
  creatorSupportUID?: string;
  purchasedNftUID?: string;
  purchasedNftData?: {
    nftContractAddress: string;
    nftName: string;
    nftDescription: string;
  };
  razorpayOrderData?: any;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  razorpayOrderId?: string;
}

const transferNftOwnership = async (
  nftUID?: string,
  buyerUID?: string,
  ownerUID?: string
) => {
  if (nftUID && ownerUID) {
    const nftDocRef = doc(db, "nfts", nftUID);
    const ownerDocRef = doc(db, "hyprUsers", ownerUID);
    const nftDocSnap = await getDoc(nftDocRef);

    if (nftDocSnap.exists()) {
      console.log("Document data:", nftDocSnap.data());
      if (nftDocSnap.data().ownerUid === ownerUID) {
        try {
          await updateDoc(nftDocRef, {
            ownerUid: buyerUID,
            forSale: false,
          })
            .then(() => {
              updateDoc(ownerDocRef, {
                soldNfts: arrayUnion(nftUID),
              });
            })
            .then(() => {
              return "PAYMENT SUCCESSFUL";
            });
        } catch (error) {
          console.log("Owner ids did not match", error);
          return "ERROR WITH OWNER UID";
        }
      }
    } else {
      // doc.data() will be undefined in this case
      return "NFT DOES FOUND";
      console.log("This nft does not exist in the database!");
    }
  }
};

const savePaymentData = async (paymentDetails: paymentDetailsSchema) => {
  const allPaymentRef = await addDoc(
    collection(db, "paymentRecords"),
    paymentDetails
  );

  const paymentType =
    paymentDetails.transactionType === "Creator Support"
      ? "creatorSupportPaymentReords"
      : "nftPurchasePaymentRecords";

  const paymentTypeRef = await addDoc(
    collection(db, paymentType),
    paymentDetails
  );

  console.log("All Payments record created with ID: ", allPaymentRef.id);
  console.log("Payment type record created with ID: ", paymentTypeRef.id);

  if (paymentDetails.transactionSuccess === "success") {
    if (paymentDetails.transactionType === "NFT Purchase") {
      transferNftOwnership(
        paymentDetails.purchasedNftUID,
        paymentDetails.buyerUID,
        paymentDetails.recipientData?.reciepientUID
      );
    } else {
      console.log("Thank you for supporting the creator...");
      return "PAYMENT SUCCESSFUL";
    }
  } else {
    console.log("payment was not successful");
    return "PAYMENT FAILED";
  }
};

export default savePaymentData;
