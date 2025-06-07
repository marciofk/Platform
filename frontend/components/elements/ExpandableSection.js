import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { DynamicColors } from '../../styles'; 

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ExpandableSection = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.titleText}>
          {title} {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.body}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: DynamicColors.getColors().CARD_BORDER,
    borderRadius: 8,
    overflow: 'hidden', // <- important to keep the border radius after expand
    backgroundColor: DynamicColors.getColors().PRIMARY_BACKGROUND,
  },
  header: {
    padding: 15,
    backgroundColor: DynamicColors.getColors().SECONDARY_BACKGROUND,
  },
  titleText: {
    fontWeight: 'bold',
    color: DynamicColors.getColors().PRIMARY_TEXT,
  },
  body: {
    padding: 15,
    backgroundColor: DynamicColors.getColors().PRIMARY_BACKGROUND,
  },
  contentText: {
    color: DynamicColors.getColors().PRIMARY_TEXT,
  },
});

export default ExpandableSection;
