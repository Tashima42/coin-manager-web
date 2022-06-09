import {FC} from 'react';
import './card.scss'

interface CardProps{
    name: string;
    description: string;
}

const Card: FC<CardProps> = ({name, description}) => {
    return (
        <div className="collection-card">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
    );
};

export default Card;
