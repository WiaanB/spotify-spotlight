
import { useEffect } from 'react';

export interface IToastProps {
    message: string;
    show: boolean;
    time?: number;
    handleToast: (show: boolean) => void;
}

export default function Toast({ message, show, handleToast, time }: IToastProps) {

    useEffect(() => {
        if (show) {
          const timeId = setTimeout(() => {
            handleToast(false);
          }, time ?? 3000)
      
          return () => {
            clearTimeout(timeId)
          }
        }
      }, [show, handleToast, time]);

    return (
        <div className="toast">
            <div className='alert bg-green-400 text-black'>
                <span>{message}</span>
            </div>
        </div>
    )

}