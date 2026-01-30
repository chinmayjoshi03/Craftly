import type { CanvasElement } from '../store/useEditorStore';

export function generateReactNativeCode(elements: CanvasElement[]): string {
    if (elements.length === 0) {
        return `// No elements added yet
// Click on elements in the left panel to add them to your screen`;
    }

    const imports = generateImports(elements);
    const componentCode = generateComponent(elements);
    const stylesCode = generateStyles(elements);

    return `${imports}

${componentCode}

${stylesCode}`;
}

function generateImports(elements: CanvasElement[]): string {
    const componentSet = new Set<string>();
    componentSet.add('View');
    componentSet.add('StyleSheet');

    elements.forEach((el) => {
        switch (el.type) {
            case 'Button':
                componentSet.add('TouchableOpacity');
                componentSet.add('Text');
                break;
            case 'Text':
                componentSet.add('Text');
                break;
            case 'Image':
                componentSet.add('Image');
                break;
            case 'Input':
                componentSet.add('TextInput');
                break;
            case 'Card':
                componentSet.add('Text');
                break;
            case 'Icon':
                componentSet.add('Text');
                break;
            case 'Container':
                break;
            case 'Switch':
                componentSet.add('Switch');
                break;
        }
    });

    const components = Array.from(componentSet).sort().join(', ');
    return `import React, { useState } from 'react';
import { ${components} } from 'react-native';`;
}

function generateComponent(elements: CanvasElement[]): string {
    const hasSwitch = elements.some((el) => el.type === 'Switch');
    const switchStates = elements
        .filter((el) => el.type === 'Switch')
        .map((el) => `const [${el.id}Enabled, set${capitalize(el.id)}Enabled] = useState(${el.style.isOn !== false});`)
        .join('\n  ');

    const elementsJSX = elements.map((el) => generateElementJSX(el)).join('\n      ');

    return `export default function Screen() {
  ${hasSwitch ? switchStates : ''}
  return (
    <View style={styles.container}>
      ${elementsJSX}
    </View>
  );
}`;
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateElementJSX(element: CanvasElement): string {
    const { id, type, content, style } = element;
    const styleName = `styles.${id}`;

    switch (type) {
        case 'Button':
            return `<TouchableOpacity style={${styleName}} onPress={() => {}}>
        <Text style={${styleName}Text}>${content || 'Button'}</Text>
      </TouchableOpacity>`;

        case 'Text':
            return `<Text style={${styleName}}>${content || 'Text'}</Text>`;

        case 'Image':
            const imageUrl = element.style.imageUrl || 'https://via.placeholder.com/150';
            return `<Image
        style={${styleName}}
        source={{ uri: '${imageUrl}' }}
        resizeMode="cover"
      />`;

        case 'Input':
            return `<TextInput
        style={${styleName}}
        placeholder="${content || 'Enter text...'}"
        placeholderTextColor="#9ca3af"
      />`;

        case 'Card':
            return `<View style={${styleName}}>
        <Text style={${styleName}Title}>${content || 'Card Title'}</Text>
        <Text style={${styleName}Body}>Card content goes here...</Text>
      </View>`;

        case 'Icon':
            return `<Text style={${styleName}}>${content || '⭐'}</Text>`;

        case 'Container':
            return `<View style={${styleName}}>
        {/* Add child components here */}
      </View>`;

        case 'Switch':
            return `<Switch
        style={${styleName}}
        value={${id}Enabled}
        onValueChange={set${capitalize(id)}Enabled}
        trackColor={{ false: '#d1d5db', true: '${style.backgroundColor || '#6366f1'}' }}
        thumbColor="#ffffff"
      />`;

        default:
            return '';
    }
}

function generateStyles(elements: CanvasElement[]): string {
    const styleEntries = elements.map((el) => generateElementStyle(el)).join(',\n  ');

    return `const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  ${styleEntries}
});`;
}

function generateElementStyle(element: CanvasElement): string {
    const { id, type, style } = element;
    const styleProps: string[] = [];

    // Position
    styleProps.push(`position: 'absolute'`);
    styleProps.push(`left: ${style.x}`);
    styleProps.push(`top: ${style.y}`);

    // Dimensions
    styleProps.push(`width: ${style.width}`);
    styleProps.push(`height: ${style.height}`);

    // Background
    if (style.backgroundColor && style.backgroundColor !== 'transparent') {
        styleProps.push(`backgroundColor: '${style.backgroundColor}'`);
    }

    // Border Radius
    if (style.borderRadius) {
        styleProps.push(`borderRadius: ${style.borderRadius}`);
    }

    // Border
    if (style.borderWidth) {
        styleProps.push(`borderWidth: ${style.borderWidth}`);
        styleProps.push(`borderColor: '${style.borderColor || '#d1d5db'}'`);
    }

    // Padding
    if (style.padding && (type === 'Input' || type === 'Card' || type === 'Container')) {
        styleProps.push(`padding: ${style.padding}`);
    }

    // Button specific
    if (type === 'Button') {
        styleProps.push(`alignItems: 'center'`);
        styleProps.push(`justifyContent: 'center'`);
    }

    const mainStyle = `${id}: {
    ${styleProps.join(',\n    ')},
  }`;

    // Text style for buttons
    if (type === 'Button') {
        const textStyle = `${id}Text: {
    color: '${style.color || '#ffffff'}',
    fontSize: ${style.fontSize || 16},
    fontWeight: '600',
  }`;
        return `${mainStyle},
  ${textStyle}`;
    }

    // Text element style
    if (type === 'Text') {
        const textProps = [...styleProps];
        if (style.color) {
            textProps.push(`color: '${style.color}'`);
        }
        if (style.fontSize) {
            textProps.push(`fontSize: ${style.fontSize}`);
        }
        return `${id}: {
    ${textProps.join(',\n    ')},
  }`;
    }

    // Input style
    if (type === 'Input') {
        styleProps.push(`color: '${style.color || '#1a1a1a'}'`);
        styleProps.push(`fontSize: ${style.fontSize || 16}`);
        return `${id}: {
    ${styleProps.join(',\n    ')},
  }`;
    }

    // Card styles
    if (type === 'Card') {
        styleProps.push(`shadowColor: '#000'`);
        styleProps.push(`shadowOffset: { width: 0, height: 4 }`);
        styleProps.push(`shadowOpacity: 0.1`);
        styleProps.push(`shadowRadius: 12`);
        styleProps.push(`elevation: 4`);

        const cardStyle = `${id}: {
    ${styleProps.join(',\n    ')},
  }`;
        const titleStyle = `${id}Title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  }`;
        const bodyStyle = `${id}Body: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  }`;
        return `${cardStyle},
  ${titleStyle},
  ${bodyStyle}`;
    }

    // Icon style
    if (type === 'Icon') {
        styleProps.push(`fontSize: ${style.fontSize || 32}`);
        if (style.color) {
            styleProps.push(`color: '${style.color}'`);
        }
        styleProps.push(`textAlign: 'center'`);
        return `${id}: {
    ${styleProps.join(',\n    ')},
  }`;
    }

    return mainStyle;
}
