/**
 * BLOCK: section-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	SelectControl,
} = wp.components;
const { Fragment } = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	PanelColorSettings,
} = wp.blockEditor;

export default ( props ) => {
	console.log('EDIT DEPRECATED', props);
	const {
		attributes,
		setAttributes,
		setBackgroundColor,
	} = props;

	const { customBackgroundColor, customTextColor,  } = attributes

	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings
					initialOpen={ false }
					title={ __( 'Colors' ) }
					colorSettings={[
						{
							label: __( 'Background Color' ),
							value: customBackgroundColor,
							onChange: ( nextBgColor, ...whatelse ) => {
								setBackgroundColor( nextBgColor );
								setAttributes(
									{
										customBackgroundColor: nextBgColor
									}
								)
							}
						},
						{
							label: __( 'Text Color' ),
							value: customTextColor,
							onChange: ( nextColor, ...whatelse ) => {
								setAttributes(
									{
										customTextColor: nextColor
									}
								)
							}
						}
					]}
				/>
			</InspectorControls>
			<InspectorAdvancedControls>
				<SelectControl
					label="Tag"
					value={ tagName }
					options={ [
						{ label: 'section', value: 'section' },
						{ label: 'header', value: 'header' },
						{ label: 'footer', value: 'footer' },
						{ label: 'div', value: 'div' },
					] }
					onChange={ ( tagName ) => { setAttributes( { tagName } ) } }
				/>
			</InspectorAdvancedControls>
			<section
				className={ props.className }
				style={ {
					backgroundColor: customBackgroundColor,
					color: customTextColor,
				} }
			>
				<InnerBlocks />
			</section>
		</Fragment>
	);
}
