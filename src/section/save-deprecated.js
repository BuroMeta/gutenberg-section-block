/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import classnames from 'classnames';

const {
	InnerBlocks,
	getColorClassName,
} = wp.blockEditor;

export default ( pp ) => {
	const { attributes, className } = pp;
	const {
		backgroundColor,
		customTextColor,
		customBackgroundColor,
		spacingBottom,
		spacingTop,
	} = attributes;
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const classes = classnames(
		{
			className,
			[ backgroundClass ]: backgroundClass,
		}
	);

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: customTextColor ? customTextColor : undefined,
		paddingBottom: spacingBottom ? spacingBottom : undefined,
		paddingTop: spacingTop ? spacingTop : undefined,
	};

	return (
		<section className={ classes ? classes : undefined } style={ styles }>
			<InnerBlocks.Content />
		</section>
	);
};
