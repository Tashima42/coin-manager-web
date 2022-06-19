import {FC, HTMLAttributes, DetailedHTMLProps} from 'react';
import './card.scss'

interface CardProps{
    name: string;
    description: string;
    onClick?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>['onClick'];
}

const Card: FC<CardProps> = ({name, description, onClick}) => {
  console.log(onClick)
    return (
        <div className="collection-card" onClick={onClick}>
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
    );
};

export default Card;
