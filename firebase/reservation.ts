import firebase from '../firebase/firebaseInit';

type Props = {
    userId: string,
    expertId: string,
    question?: string,
    price: object,
    reservationTime: Date
}

export const completeResevation = async (props : Props) => {

    const { userId, expertId, question, price, reservationTime } = props;

    try{
        await firebase.firestore().collection('reservations').doc(userId)
        .collection('items')
        .add({
            expertId,
            question,
            reservationTime,
            price,
            status: 'REQUESTED',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        await firebase.firestore().collection('experts').doc(expertId)
        .collection('reservations')
        .add({
            question,
            reservationTime,
            price,
            userId,
            status: 'REQUESTED',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        await firebase.firestore().collection('experts').doc(expertId).update({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            reservedTimes: firebase.firestore.FieldValue.arrayUnion(reservationTime)
        })
    }catch(ex){
        console.log('completeResevation', ex);
    }
}