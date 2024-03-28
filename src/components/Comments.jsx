/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { loadImages } from '../helpers/loadImages';

export const Comments = ({ content, score, username }) => {
	const [images, setimages] = useState([]);

	useEffect(() => {
		loadImages()
			.then((response) => {
				const userImages = response.filter((item) => item.name.includes(username));

				const imageUrls = userImages.map((item) => item.url);

				setimages(imageUrls);
			})

			.catch((err) => console.error(err));
	}, [username]);

	console.log(images);

	return (
		<section className='comments-container'>
			<article className='comments-structure'>
				<div className='comments-structure__header'>
					<figure>
						<img src={images} alt='' className='comments-structure__header--img' />
					</figure>

					<h3 className='comments-structure__header--h3'>{username}</h3>
					<span>{}1 month ago</span>
				</div>
				<div className='comments-structure__paragraph'>
					<p>
						{content}
						{/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique fugit quam quia commodi dolores, recusandae dolorum. Sunt,
						dignissimos! Repellat, soluta. */}
					</p>
				</div>
				<div className='comments-structure__footer'>
					<div>{score}</div>
					<button>Reply</button>
				</div>
			</article>
		</section>
	);
};
