import React, { useMemo, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useContacts } from '../../utils/ContactContext';
import {
  Colors,
  Fonts,
  Spacing,
  GlobalStyles,
} from '../../styles/globalStyles';
import { formatContactName } from '../../data/contactsData';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ContactDetailsScreen = ({ route, navigation }) => {
  const { contactId } = route.params;
  const { contacts, loading, toggleFavorite } = useContacts();

  const contact = useMemo(
    () => contacts.find(c => c.id === contactId),
    [contacts, contactId],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddContact', { contact })}
          style={{ marginRight: Spacing.md }}
        >
          <Icon name="edit" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, contact]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!contact) {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.centered]}>
        <Icon name="error-outline" size={60} color={Colors.accent} />
        <Text style={styles.notFoundText}>Contact not found.</Text>
      </View>
    );
  }

  const fullName = formatContactName(contact);
  const initials =
    `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();

  const handleAction = (url, type) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `${type} is not supported on this device.`);
      }
    });
  };

  const ActionButton = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Icon name={icon} size={24} color={Colors.primary} />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={GlobalStyles.container}>
      {/* Header with Avatar and Name */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {contact.avatar ? (
            <Image source={{ uri: contact.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.company}>{contact.company || 'No company'}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(contact.id)}
        >
          <Icon
            name={contact.favorite ? 'star' : 'star-border'}
            size={28}
            color={contact.favorite ? Colors.secondary : Colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <ActionButton
          icon="phone"
          label="Call"
          onPress={() => handleAction(`tel:${contact.phone}`, 'Phone calls')}
        />
        <ActionButton
          icon="message"
          label="Text"
          onPress={() => handleAction(`sms:${contact.phone}`, 'SMS')}
        />
        <ActionButton
          icon="email"
          label="Email"
          onPress={() => handleAction(`mailto:${contact.email}`, 'Email')}
        />
      </View>

      {/* Contact Information Card */}
      <View style={styles.infoCard}>
        <InfoRow icon="phone" label="Phone" value={contact.phone} />
        <InfoRow icon="email" label="Email" value={contact.email} />
        <InfoRow
          icon="location-on"
          label="Address"
          value={contact.address || 'Not available'}
        />
        <InfoRow
          icon="cake"
          label="Birthday"
          value={contact.birthday || 'Not available'}
        />
      </View>

      {/* Notes Card */}
      {contact.notes && (
        <View style={styles.infoCard}>
          <Text style={styles.notesTitle}>Notes</Text>
          <Text style={styles.notesText}>{contact.notes}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Icon name={icon} size={22} color={Colors.text.secondary} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    ...GlobalStyles.centered,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    ...GlobalStyles.centered,
    backgroundColor: Colors.primary,
  },
  avatarText: {
    color: Colors.text.light,
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
  },
  name: {
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  company: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionButton: {
    ...GlobalStyles.centered,
  },
  actionLabel: {
    fontSize: Fonts.small,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
  infoCard: {
    ...GlobalStyles.card,
    marginTop: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  infoTextContainer: {
    marginLeft: Spacing.md,
  },
  infoLabel: {
    fontSize: Fonts.small,
    color: Colors.text.secondary,
  },
  infoValue: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
  },
  notesTitle: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    color: Colors.text.primary,
  },
  notesText: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  notFoundText: {
    fontSize: Fonts.large,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
});

export default ContactDetailsScreen;