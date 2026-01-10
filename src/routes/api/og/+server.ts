import { ImageResponse } from '@vercel/og';
import type { RequestHandler } from './$types';
import { getFullPoem, type Poem } from '$lib/server/parser';
import { getPoemCount } from '$lib/server/poems';

export const GET: RequestHandler = async ({ url }) => {
	const idParam = url.searchParams.get('id');
	const count = getPoemCount();
	const index = idParam !== null && !isNaN(Number(idParam)) ? Number(idParam) % count : 0;

	const poem: Poem = getFullPoem(index);

	return new ImageResponse(
		{
			type: 'div',
			props: {
				style: {
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundColor: '#f5f3ff', // violet-50
					backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ede9fe 25%, #c4b5fd 100%)', // flashier multi-stop gradient (violet 100 -> 300)
					padding: '0 100px',
					position: 'relative'
				},
				children: [
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								maxWidth: '900px'
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											fontSize: '20px',
											textTransform: 'uppercase',
											letterSpacing: '0.2em',
											color: '#7c3aed', // violet-600
											marginBottom: '20px',
											fontWeight: '500'
										},
										children: 'дневна доза поезија'
									}
								},
								{
									type: 'h1',
									props: {
										style: {
											fontSize: '60px',
											fontWeight: '600',
											marginBottom: '10px',
											textAlign: 'left',
											color: '#0f172a' // slate-900
										},
										children: poem.metadata.title
									}
								},
								{
									type: 'h2',
									props: {
										style: {
											fontSize: '32px',
											marginBottom: '40px',
											textAlign: 'left',
											color: '#6d28d9', // violet-700
											fontWeight: '400',
											opacity: 0.9
										},
										children: poem.metadata.author
									}
								},
								{
									type: 'div',
									props: {
										style: {
											fontSize: '28px',
											lineHeight: '1.6',
											textAlign: 'left',
											color: '#334155', // slate-700
											whiteSpace: 'pre-wrap',
											fontStyle: 'italic',
											display: 'flex',
											flexDirection: 'column',
											fontWeight: '300'
										},
										children: poem.snippet.split('\n').map((line) => ({
											type: 'div',
											props: { children: line }
										}))
									}
								}
							]
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630
		}
	);
};
