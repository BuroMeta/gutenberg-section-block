/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import classnames from 'classnames';
import Section from './section-tag';

const {
	InnerBlocks,
	getColorClassName,
} = wp.blockEditor;

export default ( { attributes, className } ) => {
	const {
		tagName,
		backgroundColor,
		customTextColor,
		customBackgroundColor,
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
	};
	return (
		<Section tagName={ tagName } className={ classes ? classes : undefined } style={ styles }>
			<div className={ classnames( 'wp-block-mkl-section-inner' ) }>
				<InnerBlocks.Content />
			</div>
		</Section>
	);
};
